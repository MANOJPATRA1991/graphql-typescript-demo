import { connect } from "mongoose";

export const MONGO_URI = `mongodb://mongodb_container:27017/test?retryWrites=true&w=majority`;

export const dbConnect = async () => {
  // create mongoose connection
  const mongoose = await connect(MONGO_URI);
  await mongoose.connection;
}
