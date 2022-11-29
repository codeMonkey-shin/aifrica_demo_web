const {Post} = require("../models");
const {asyncWrapper} = require("../errors/async");
const { pagingSize,paging } = require("../config/pagingConfig");
const CustomError = require("../errors/custom-error");
const StatusCodes = require("http-status-codes");


module.exports = {
    postImage: asyncWrapper(async (req, res, next) => {  // 이미지를 등록함
        if (req.body.userName === undefined || req.body.userEmail === undefined || req.body.userPhone === undefined || req.body.prompt === undefined || req.body.translatedPrompt === undefined || req.file.location === undefined) {
            throw new CustomError(
                "올바르지 않은 파라미터 값입니다.",
                StatusCodes.CONFLICT
            );
        }
        const imageUrl = req.file.location;
        const {userName,userEmail,userPhone,prompt,translatedPrompt} = req.body;
        await Post.create({
            userName:userName,
            userEmail: userEmail,
            userPhone: userPhone,
            prompt: prompt,
            translatedPrompt: translatedPrompt,
            imageUrl: imageUrl
        })
        res.status(StatusCodes.OK).send({message: "등록이 완료되었습니다."});
    }),
    getNotApprovedImages: asyncWrapper(async (req, res, next) => {  // 승인되지 않은 이미지들을 가져옴
        const page = req.query.page;
        const count = await Post.count({where:{isApproved:false}})
        const result = await Post.findAll({
            where:{isApproved:false},
            attributes:["id","userName","isLike","hit","imageUrl"] ,
            order: [["id", "DESC"]],
            offset: paging(page, pagingSize),
            limit: pagingSize,
        });
        res.status(StatusCodes.OK).json({
            status:"success",
            data: result,
            count:count
        });
    }),
    approve: asyncWrapper(async (req, res, next) => { // 이미지를 승인함
        if(req.query.id===undefined){
            throw new CustomError(
                "올바르지 않은 id 값입니다.",
                StatusCodes.CONFLICT
            );
        }
        const id = req.query.id;
        const result = await Post.findOne({
            where:{id:id}
        });
        await result.update({isApproved:true})
        res.status(StatusCodes.OK).send({message: "이미지 승인이 완료되었습니다."});
    }),
    getImages: asyncWrapper(async (req, res, next) => { // 승인된 이미지들을 가져옴
        const page = req.query.page;
        const count = await Post.count({where:{isApproved:true}})
        const result = await Post.findAll({
            where:{isApproved:true},
            attributes:["id","userName","isLike","hit","imageUrl"] ,
            order: [["id", "DESC"]],
            offset: paging(page, pagingSize),
            limit: pagingSize,
        });
        res.status(StatusCodes.OK).json({
            status:"success",
            data: result,
            count:count
        });
    }),
    getImage: asyncWrapper(async (req, res, next) => { // 이미지에 대한 상세정보를 가져옴
        if(req.query.id===undefined){
            throw new CustomError(
                "올바르지 않은 id 값입니다.",
                StatusCodes.CONFLICT
            );
        }
        const id = req.query.id;
        const result = await Post.findOne({
            where:{id:id}
        });
        await result.increment("hit");
        res.status(StatusCodes.OK).json({
            status:"success",
            data: result,
        });
    }),
    like: asyncWrapper(async (req, res, next) => { // 이미지 좋아요 및 좋아요 취소 처리
        if(req.query.id===undefined){
            throw new CustomError(
                "올바르지 않은 id 값입니다.",
                StatusCodes.CONFLICT
            );
        }
        const id = req.query.id;
        const result = await Post.findOne({
            where:{id:id}
        });
        if(result.isLike===true){
            await result.update({isLike:false})
            res.status(StatusCodes.OK).send({message: "좋아요 취소가 완료되었습니다."});
        }else{
            await result.update({isLike:true})
            res.status(StatusCodes.OK).send({message: "좋아요가 완료되었습니다."});
        }
    }),
    getLikedImages: asyncWrapper(async (req, res, next) => { // 좋아요 처리된 이미지들을 가져옴
        const page = req.query.page;
        const count = await Post.count({where:{isLike:true}})
        const result = await Post.findAll({
            attributes:["id","userName","isLike","hit","imageUrl"],
            where:{isLike:true},
            order: [["id", "DESC"]],
            offset: paging(page, pagingSize),
            limit: pagingSize,
        });
        res.status(StatusCodes.OK).json({
            status:"success",
            data: result,
            count:count
        });
    }),
    deleteImage: asyncWrapper(async (req, res, next) => { // 이미지를 삭제함
        if(req.query.id===undefined){
            throw new CustomError(
                "올바르지 않은 id 값입니다.",
                StatusCodes.CONFLICT
            );
        }
        const id = req.query.id;
        await Post.destroy({
            where:{id:id}
        });
        res.status(StatusCodes.OK).send({message: "삭제가 완료되었습니다."})
    }),

}