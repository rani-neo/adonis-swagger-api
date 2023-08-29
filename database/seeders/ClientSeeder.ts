import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Client from 'App/Models/Client'

export default class ClientsSeeder extends BaseSeeder {
  public async run () {
    // ASX 50 companies (sample list, you can add more as required)
    const clientsData = [
      { clientName: 'BHP' },
      { clientName: 'Commonwealth Bank' },
      { clientName: 'Telstra' },
      { clientName: 'Woolworths' },
      { clientName: 'Macquarie Group' },
      { clientName: 'Westpac Banking' },
      { clientName: 'National Australia Bank' },
      { clientName: 'ANZ Banking Group' },
      { clientName: 'Fortescue Metals Group' },
      { clientName: 'Wesfarmers' },
      { clientName: 'Rio Tinto' },
      { clientName: 'Afterpay' },
      { clientName: 'QBE Insurance Group' },
      { clientName: 'Scentre Group' },
      { clientName: 'Amcor' },

      // ... add more companies as required
    ]

    await Client.createMany(clientsData)
  }
}
