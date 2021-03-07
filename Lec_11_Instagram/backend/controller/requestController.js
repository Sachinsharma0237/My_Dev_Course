const followerModel = require("../model/followerModel");
const followingModel = require("../model/followingModel");
const userModel = require("../model/userModel");


async function sendRequest(req, res) {
    try{
        let { uid, followId } = req.body;
        let doc = await userModel.find({_id:followId}).exec();
        console.log(doc);
        if(doc[0].isPublic=="true"){                    
            await followingModel.create({
                uid,
                followId
            })
            await followerModel.create({
                uid:followId,
                followerId:uid
            })
            res.json({
                message:"request sent and accepted!"
            })
        }else{
             //isPublic = false;
            await followingModel.create({
                uid,
                followId,
                isAccepted:false
            })
            res.json({
                message:"Request sent and Pending!"
            })
        }
    }
    catch(error){
            res.json({
                message:"Failed to send request!",
                error
            })
    }
}
async function acceptRequest(req, res) {
    try{
        let{ uid, toBeAccepted } = req.body;
        let doc = await followingModel.find({followId:uid}).exec();
        console.log(doc);
        doc[0].isAccepted = true;
        await doc[0].save();
        await followerModel.create({
            uid,
            followerId : toBeAccepted
        });
        res.json({
            message:"Request Accepted!!!"
        })
    }
    catch(error){
        res.json({
            message:"failed to accept request!!!!",
            error
        })
    }
}
async function pendingRequests(req, res) {
    try{
        let {uid}= req.params;
        let docs = await followingModel.find({followId:uid, isAccepted:false}).exec();
        console.log(docs); 
        let requests = [];
        for(let i = 0; i < docs.length; i++){
            let uid = docs[i].uid;
            let user = await userModel.findById(uid);
            requests.push(user);
        }
        console.log(requests);
        res.json({
            message:"Succesfully got pending list",
            requests
        })
    }
    catch(error){
        res.json({
            message:"failed To Get List",
            error
        })

    }
}
async function deleteRequest(req , res){
    try{
        let {uid} = req.params;
        let { toBeDeleted } = req.body;
        let request = await followingModel.find({uid:toBeDeleted, followId:uid, isAccepted:false}).exec();
        if(request[0] != null){
            let deletedRequest = await followingModel.deleteOne({uid:toBeDeleted, followId:uid, isAccepted:false});
            res.json({
                message:"request deleted!!!",
                deletedRequest
            })
            // res.deletedCount
        }else{
            res.json({
                message:"Request don't exist"
            })
        }
    }
    catch(error){
        res.json({
            message:"failed to delete request",
            error
        })
    }
    
}
async function cancelRequest(req , res){
    try{
        let {uid} = req.params;
        let {toBeCanceled} = req.body;
        let sentRequest = await followingModel.find({uid:uid, followId:toBeCanceled, isAccepted:false}).exec();
        console.log(sentRequest);
        if(sentRequest[0] != null){
            let deletedRequest = await followingModel.deleteOne({uid:uid, followId:toBeCanceled, isAccepted:false});
            res.json({
                message:"request canceled",
                deletedRequest
            })
        }else{
            res.json({
                message:"Request don't exist"
            })
        }
    }
    catch(error){

    }


}
async function deleteFollowing(req , res){
    try{
        let uid = req.params.uid;
        let {toBeUnfollowed} = req.body;
        let unfollowUser = await followerModel.find({uid:uid, followerId:toBeUnfollowed}).exec();
        console.log(unfollowUser);
        if(unfollowUser[0] != null){
            let unfollowedUser = await followerModel.deleteOne({uid:uid, followerId:toBeUnfollowed});
            res.json({
                message:"unfollowed user!!!",
                unfollowedUser
            })
        }else{
            res.json({
                message:"User don't exist"
            })
        }
    }
    catch(error){
        res.json({
            message:"Failed to unfollow!",
            error
        })
    }

}
async function deleteFollower(req , res){
    try{
        let uid = req.params.uid;
        let {myFollower} = req.body;
        let request = await followingModel.find({uid:myFollower, followId:uid, isAccepted:true}).exec();
        console.log(request);
        if(request[0] != null){
            let removedFollower = await followingModel.deleteOne({uid:myFollower, followId:uid, isAccepted:true});
            res.json({
                message:"my follower removed!!",
                removedFollower
            })
        }else{
            res.json({
                message:"follower don't exist!!!"
            })
        }
    }
    catch(error){
        res.json({
            message:"Failed to remove follower!!"
        })
    }
}
async function getFollowingHelper(uid) {
    try{
        let following = await followingModel.find({uid:uid, isAccepted:true}).exec();
        let myFollowing = [];
            for(let i = 0; i < following.length; i++){
                let user = await userModel.findById( following[i].followId );
                myFollowing.push(user);
            }
        return myFollowing;  
    }
    catch(error){
        return error;
    }
}
async function getAllFollowing(req , res){
    try{
        let uid = req.params.uid;
        let myFollowing = await getFollowingHelper(uid);
        if(myFollowing.length){
            res.json({
                message:`Successfully got all following = ${myFollowing.length}`,
                myFollowing
            })
        }else{
            res.json({
                message:"Alas! you ain't following anyone"
            })
        }
    }
    catch(error){
        res.json({
            message:"failed to get all following",
            error
        })
    }

}
async function getAllFollowers(req , res){
    try{
        let uid = req.params.uid;
        let followerIds = await followerModel.find({uid:uid}).exec();
        if(!followerIds.length){
            res.json({
                message:"Oops!! You don't have any followers"
            })
        }else{
            let myFollower = [];
            for(let i = 0; i < followerIds.length; i++){
                let user = await userModel.findById( followerIds[i].followerId );
                myFollower.push(user);
            }
            res.json({
                message:`Successfully got all followers = ${followerIds.length}`,
                myFollower
    
            })
        }
    }
    catch(error){
        res.json({
            message:"failed to get all following",
            error
        })
    }
}
async function getSuggestions(req , res){
    try{
        let uid = req.params.uid;
        let myFollowing = await getFollowingHelper(uid);
        let checkList = myFollowing.map(function(user){
            return user["_id"] + "";
        });
        checkList.push(uid);
        console.log(checkList);
        let suggestions = [];
        for(let i = 0; i < myFollowing.length; i++){
            let followingOfMyFollowings = await getFollowingHelper(myFollowing[i]["_id"]); 
            for(let j = 0; j < followingOfMyFollowings.length; j++){
                if( !checkList.includes(followingOfMyFollowings[j]["_id"]) ){
                    suggestions.push(followingOfMyFollowings[j]);
                    checkList.push(followingOfMyFollowings[j]["_id"] + "");
                }
            }
        }

        res.json({    
            message:"Successfully got all suggestions!!!",
            suggestions
        })
    }
    catch(error){
        res.json({
            message:"Failed to get Suggestions",
            error
        })
    }
}

module.exports.sendRequest = sendRequest;
module.exports.acceptRequest = acceptRequest;
module.exports.pendingRequests = pendingRequests;
module.exports.deleteRequest = deleteRequest;
module.exports.cancelRequest = cancelRequest;
module.exports.deleteFollowing = deleteFollowing;
module.exports.deleteFollower = deleteFollower;
module.exports.getAllFollowing = getAllFollowing;
module.exports.getAllFollowers = getAllFollowers;
module.exports.getSuggestions = getSuggestions;
