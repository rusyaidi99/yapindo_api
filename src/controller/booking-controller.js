import { 
    createBookingValidation,
} from "../validation/booking-validation.js";
import { bookingService } from "../service/booking-service.js";
import { bookedseatService } from "../service/bookedseat-service.js";
import { ResponseError } from "../application/error.js";
import redis from "../application/redis.js";
import { jwtVerify } from "../application/jwt.js";
import {sequelize} from "../application/database.js";

const add = async (req, res, next) => {
    try {
        let bookingData = createBookingValidation(req.body);

        const seats = JSON.parse(await redis.get(`showtimeseats:${bookingData.showtime_id}`));

        const selectedSeats = bookingData.seats;

        const allAvailable = selectedSeats.every(sn => {
            const seat = seats.find(s => s.seat_number === sn);
            return seat && seat.status === 'Available';
        });

        if (!allAvailable) {
            throw new ResponseError(400,'Seat not available');
        }

        const authHeader = req.headers['authorization'];
        const user = jwtVerify(authHeader.split(' ')[1])

        const t = await sequelize.transaction();
        
        const insertBook = await bookingService.create({
            user_id: user.id,
            showtime_id: bookingData.showtime_id 
        }, { transaction: t });

        const bookedSeatsPayload = selectedSeats.map(seat_number => ({
            booking_id: insertBook.id,
            seat_number
        }));

        await bookedseatService.bulkCreate(bookedSeatsPayload, { transaction: t });

        await regenerateSeatRedis(bookingData.showtime_id, seats, selectedSeats);

        await t.commit();
        
        return res.status(200).json({success: true, message: 'success'});
    } catch (error) {
        next(error);
    }
};

const regenerateSeatRedis = async (id, seats, selectedSeats) => {
    seats = seats.map(seat => {
        if (selectedSeats.includes(seat.seat_number)) {
            return { ...seat, status: 'Booked' };
        }
        return seat;
    });

    await redis.set(`showtimeseats:${id}`, JSON.stringify(seats), { EX: 60 * 60 * 24 });
}

export default {
    add
}