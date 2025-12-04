import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { roleMiddleware } from "../middleware/role-middleware.js";

import userController from "../controller/user-controller.js";
import movieController from "../controller/movie-controller.js";
import studioController from "../controller/studio-controller.js";
import showtimeController from "../controller/showtime-controller.js";
import bookingController from "../controller/booking-controller.js";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);

router.post("/movies", authMiddleware, roleMiddleware("admin"), movieController.add);
router.get("/movies", authMiddleware, roleMiddleware("admin", "user"), movieController.list);
router.get("/movies/:id", authMiddleware, roleMiddleware("admin", "user"), movieController.detail);
router.get("/movies/:id/showtimes", authMiddleware, roleMiddleware("admin", "user"), movieController.detailShowtime);
router.put("/movies/:id", authMiddleware, roleMiddleware("admin"), movieController.edit);
router.delete("/movies/:id", authMiddleware, roleMiddleware("admin"), movieController.remove);

router.post("/studios", authMiddleware, roleMiddleware("admin"), studioController.add);
router.get("/studios", authMiddleware, roleMiddleware("admin"), studioController.list);
router.get("/studios/:id", authMiddleware, roleMiddleware("admin"), studioController.detail);
router.put("/studios/:id", authMiddleware, roleMiddleware("admin"), studioController.edit);
router.delete("/studios/:id", authMiddleware, roleMiddleware("admin"), studioController.remove);

router.post("/showtimes", authMiddleware, roleMiddleware("admin"), showtimeController.add);
router.get("/showtimes", authMiddleware, roleMiddleware("admin", "user"), showtimeController.list);
router.get("/showtimes/:id", authMiddleware, roleMiddleware("admin", "user"), showtimeController.detail);
router.get("/showtimes/:id/seats", authMiddleware, roleMiddleware("admin", "user"), showtimeController.detailSeat);
router.put("/showtimes/:id", authMiddleware, roleMiddleware("admin"), showtimeController.edit);
router.delete("/showtimes/:id", authMiddleware, roleMiddleware("admin"), showtimeController.remove);

router.post("/bookings", authMiddleware, roleMiddleware("admin", "user"), bookingController.add);


export {
    router
};