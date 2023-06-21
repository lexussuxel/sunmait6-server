const Router = require("express");
const contactsRouter = require("./contacts");
const router = new Router();

router.use("/contacts", contactsRouter);

module.exports = router;
