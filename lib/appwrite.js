import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";


let client;
client = new Client();

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.patrick.foodbank",
  projectId: "664293eb00300fcbcc5e",
  databaseId: "664297500003d56b69a4",
  foodStuffCollectionId: "66429822001408224f69",
  userCollectionId: "664298730016a6e4ff32",
  storageId: "66429c57001b7e77e2df",
};


client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
// const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username,
      
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    // const newUser = await databases.createDocument(
    //   appwriteConfig.databaseId,
    //   appwriteConfig.userCollectionId,
    //   ID.unique(),
    //   {
    //     accountId: newAccount.$id,
    //     email: email,
    //     username: username,
    //     avatar:avatarUrl
    //   }
    // );

    // return newUser;
  } catch (error) {
    await account.deleteSession("current");

    throw new Error(error);
  } finally {

  }
}

// Sign In
export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}


// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

