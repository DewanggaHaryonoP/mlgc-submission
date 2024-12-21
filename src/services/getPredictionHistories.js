const { Firestore } = require("@google-cloud/firestore");

async function getPredictionHistories() {
  const db = new Firestore({
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    credentials: {
      client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/gm, "\n"),
    },
  });

  const predictCollection = db.collection("prediction");
  const snapshot = await predictCollection.orderBy("createdAt", "desc").get();

  const histories = [];
  snapshot.forEach((doc) => {
    histories.push({
      id: doc.id,
      history: doc.data(),
    });
  });

  return histories;
}

module.exports = getPredictionHistories;
