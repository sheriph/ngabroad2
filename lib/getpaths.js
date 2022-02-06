import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI;
const clientOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
// @ts-ignore
const client = new MongoClient(uri, clientOptions);

export default async function getPaths() {
  try {
    await client.connect();
    const query = {};
    const options = {
      // sorting
      sort: {},
      //what to return
      projection: { slug: 1, _id: 0 },
    };
    const slugs = await client
      .db("ngabroad")
      .collection("posts")
      .find(query, options)
      .toArray();

    console.log(`closing connection`);
    await client.close();
    return slugs;
  } catch (err) {
    console.log(`err`, err);
    return undefined;
  }
}
