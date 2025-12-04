import { 
    createStudioValidation,
    updateStudioValidation
} from "../validation/studio-validation.js";
import { studioService } from "../service/studio-service.js";
import { ResponseError } from "../application/error.js";

const add = async (req, res, next) => {
    try {
        let studioData = createStudioValidation(req.body);

        const studioExist = await studioService.findOne({ where: { studio_number: studioData.studio_number } });
                
        if(studioExist)
        {
            throw new ResponseError(400,'Studio number is already exist');
        }

        const insertData = await studioService.create(studioData);

        return res.status(200).json({success: true, message: 'success', data: insertData});
    } catch (error) {
        next(error);
    }
};

const list = async (req, res, next) => {
    try {
        const studio = await studioService.findAll();

        return res.status(200).json({success: true, message: 'success', data:studio});
    } catch (error) {
        next(error);
    }
}

const detail = async (req, res, next) => {
    try {
        const { id } = req.params;

        const studio = await studioService.findOne({ where: { id: id }});

        return res.status(200).json({success: true, message: 'success', data:studio});
    } catch (error) {
        next(error);
    }
}

const edit = async (req, res, next) => {
    try {
        const { id } = req.params;

        let studioData = updateStudioValidation(req.body);

        const studio = await studioService.findOne({ where: { id } });
        if (!studio) {
            throw new ResponseError(404, 'Studio not found');
        }

        await studioService.update(studioData, { where: { id: id } } );

        return res.status(200).json({success: true, message: 'success'});
    } catch (error) {
        next(error);
    }
}

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;

        await studioService.destroy({ where: { id: id } });

        return res.status(200).json({success: true, message: 'success'});
    } catch (error) {
        next(error);
    }
}

export default {
    add,
    list,
    detail,
    edit,
    remove
}