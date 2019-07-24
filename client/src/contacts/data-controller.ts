import Contact from "./data";

class DataController {
  public saveContact(req: Contact) {
    return fetch(`/api/contacts/${req.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req)
    });
  }

  public deleteContact(req: string) {
    return fetch(`/api/contacts/${req}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}

export default DataController;
