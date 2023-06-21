const { object, string, number, date, InferType, array } = require("yup");

//let contactsMock = require('./mockData')
let contactsMock1 = [
  {
    id: 1,
    firstName: "Alexandra",
    lastName: "Danilevich",
    phone: 4567988,
    work: "Programmer",
    country: "PL",
    tags: ["family", "me"],
    birthDay: Date.parse("2003-06-16"),
  },
  {
    id: 2,
    firstName: "Dmitry",
    lastName: "Kudlasevich",
    phone: 4567980,
    work: "Programmer",
    country: "PL",
    tags: ["family"],
    birthDay: Date.parse("2002-06-14"),
  },
];
//{firstName="", lastName="", phone="", work="", country="", tags=[], birthDay=new Date()}
let contactSchema = object({
  id: number().required(),
  firstName: string().required().min(3),
  lastName: string(),
  phone: number().max(9999999).required().min(100000),
  work: string(),
  birthDay: date(),
  country: string().required(),
  tags: array().of(string()),
});

class ContactsController {
  constructor(contactsMock) {
    this.contacts = [...contactsMock];
    this.getOneItem = this.getOneItem.bind(this);
    this.getItems = this.getItems.bind(this);
    this.modify = this.modify.bind(this);
  }
  contactsVal = [];
  get contacts() {
    return this.contactsVal;
  }
  set contacts(value) {
    this.contactsVal = value;
  }
  getItems(req, res) {
    return res.json(this.contacts);
  }

  getOneItem(req, res) {
    const { id } = req.query;
    return res.json(
      this.contacts.find((contact) => contact.id.toString() === id)
    );
  }

  async modify(req, res) {
    const { id, firstName, lastName, birthDay, tags, country, work, phone } =
      req.body;
    const reqBody = req.body;
    const contact = this.contacts.findIndex((c) => c.id.toString() == id);
    const newContact = {
      id,
      firstName,
      lastName,
      birthDay,
      tags,
      country,
      work,
      phone,
    };

    try {
      const validation = await contactSchema.validate(newContact);
      if (contact !== -1) {
        let obj = {};
        console.log(this.contacts[contact]);
        for (const [key, value] of Object.entries(this.contacts[contact])) {
          if (value !== reqBody[key]) {
            obj[key] = reqBody[key];
          }
        }
        this.contacts[contact] = { ...this.contacts[contact], ...obj };
        return res.json(obj);
      } else {
        this.contacts.push(validation);
        return res.json(validation);
      }
    } catch (e) {
      console.log(e);
      return res.status(400).send(e);
    }
  }
}

module.exports = new ContactsController(contactsMock1);
