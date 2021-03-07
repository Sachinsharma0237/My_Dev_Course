const { sendRequest,acceptRequest, pendingRequests, deleteRequest, cancelRequest, deleteFollowing, getAllFollowing, getAllFollowers, getSuggestions, deleteFollower
} = require("../controller/requestController");
const requestRouter = require("express").Router();

requestRouter.route("").post(sendRequest);
requestRouter.route("/accept").post(acceptRequest);

requestRouter.route("/following/:uid").get(getAllFollowing);
requestRouter.route("/following/:uid").delete(deleteFollowing);
requestRouter.route("/followers/:uid").get(getAllFollowers);
requestRouter.route("/follower/:uid").delete(deleteFollower);
requestRouter.route("/suggestions/:uid").get(getSuggestions);


requestRouter.route("/:uid")
.get(pendingRequests)
.delete(deleteRequest)
.patch(cancelRequest);


module.exports = requestRouter;