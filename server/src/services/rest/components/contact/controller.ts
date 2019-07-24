import { ContactSchema } from "./model";
import * as mongoose from "mongoose";

const Contact = mongoose.model("Contact", ContactSchema);

export class ContactController {
  handleError(error: any) {
    console.error;
  }

  public async readContacts(req: any, res: any): Promise<Response | void> {
    try {
      const contacts: any[] = await Contact.find();
      return res.status(200).json(contacts);
    } catch (error) {
      this.handleError;
    }
  }

  public async readContact(req: any, res: any): Promise<Response | void> {
    try {
      const id = req.params.id;
      const contact: any | undefined = await Contact.findById({ _id: id });
      if (!contact) {
        return res.status(404).send("Contact not found");
      }

      return res.status(200).json(contact);
    } catch (error) {
      this.handleError;
    }
  }

  public async addContact(req: any, res: any): Promise<Response | void> {
    try {
      const contact: any = new Contact(req.body);
      contact.save();
      return res.status(200).send("Contact saved!");
    } catch (error) {
      this.handleError;
    }
  }

  public async updateContact(req: any, res: any): Promise<Response | void> {
    try {
      const id = req.params.id;
      if (!id || !req.body) {
        return res.status(400).send("Update not possible");
      }

      const contact: any | undefined = await Contact.findById(id);
      if (!contact) {
        return res.status(404).send("Contact not found");
      } else {
        contact.firstName = req.body.firstName;
        contact.lastName = req.body.lastName;
        contact.email = req.body.email;
        contact.save();
        return res.status(200).send("Contact updated!");
      }
    } catch (error) {
      this.handleError;
    }
  }

  public async removeContact(req: any, res: any) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(404).send("Contact not found");
      }

      let contact: any = await Contact.findOneAndDelete({ _id: id });
      if (!contact) {
        return res.status(404).send("Contact not deleted");
      }
      return res.status(200).send("Contact deleted!");
    } catch (error) {
      this.handleError;
    }
  }
}
