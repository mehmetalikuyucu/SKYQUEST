db.auth("appfellas", "appfellas");

db = db.getSiblingDB("appfellas");

db.createUser({
  user: "appfellas",
  pwd: "appfellas",
  roles: [
    {
      role: "readWrite",
      db: "appfellas",
    },
  ],
});
