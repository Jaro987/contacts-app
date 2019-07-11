import { Router } from 'express';
import { ContactController } from './controller';

export class ContactRoutes {

    private readonly _router: Router = Router();
    private readonly controller: ContactController = new ContactController();

    public constructor() {
        this.initRoutes();
    }

    public get router(): Router {
        return this._router;
    }

    private initRoutes() {

        this._router.get(
            '/',
            this.controller.readContacts
        );

        this._router.get(
            '/:id',
            this.controller.readContact
        );

        this._router.post(
            '/',
            this.controller.addContact
        );

        this._router.post(
            '/:id',
            this.controller.updateContact
        );

        this._router.delete(
            '/:id',
            this.controller.removeContact
        );
    }

}