const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: { type: mongoose.Schema.Types.ObjectId, required: true, ref:"User" }, //reference to the user collection
    toUserId: { type: mongoose.Schema.Types.ObjectId, required: true, ref:"User" },
    status: {
      required:true,
      type: "String",
      enum: {
        values: ["ignore", "interested", "accepted", "rejected"],
        message: `{VALUE} is not a status type`,
      },
    },
  },
  { timestamps: true, }
);

connectionRequestSchema.index({fromUserId:1, toUserId:1}); // compound index

connectionRequestSchema.pre("save", function(next){
  const connectionRequest = this;
  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
     throw new Error("Cannot send connection request to yourself!");
  }
  next();
});

const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequestModel;
