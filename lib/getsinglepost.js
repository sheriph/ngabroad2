import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI;
const clientOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
// @ts-ignore
const client = new MongoClient(uri, clientOptions);

export default async function getSinglePost(slug) {
  try {
    console.log("slug", slug);
    await client.connect();
    const query = { slug: slug };
    const options = {
      // sorting
      sort: {},
      //what to return
      projection: { discussionThread: 1, id: 1 },
    };
    const post = await client
      .db("ngabroad")
      .collection("posts")
      .findOne(query, options);

    console.log(`closing connection`);
    await client.close();

    return JSON.stringify(post);
  } catch (err) {
    console.log(`err`, err);
    return undefined;
  }
}
