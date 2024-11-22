export class InstallingPage{
    constructor(page){
        this.page = page
        this.header = page.getByRole('heading', { name: 'Installing Redmine' })
    }
}