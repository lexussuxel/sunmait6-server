const Router = require("express");
const contacts = require("../controllers/contacts");

const router = new Router();

router.get("/", contacts.getItems);
router.get("/:id", contacts.getOneItem);
router.post("/:id", contacts.modify);

module.exports = router;
