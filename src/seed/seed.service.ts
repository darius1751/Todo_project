import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { CredentialService } from 'src/credential/credential.service';
import { PersonService } from 'src/person/person.service';
import { StateService } from 'src/state/state.service';
import { TaskService } from 'src/task/task.service';
import { TypeService } from 'src/type/type.service';
import { credentialSeed } from './data/credential.seed';
import { personSeed } from './data/person.seed';
import { statesSeed } from './data/states.seed';
import { typesSeed } from './data/types.seed';

@Injectable()
export class SeedService {
  
  constructor(
    private credentialService:CredentialService,
    private personService:PersonService,
    private stateService:StateService,
    private typeService:TypeService,
    private taskService:TaskService
  ){}

  async useSeed() {
    try{
      const credential = await this.credentialService.create(credentialSeed);
      await this.personService.create(credential.id, personSeed);
      statesSeed.forEach(async (createStateDto) => {
        await this.stateService.create(createStateDto)
      });     
      typesSeed.forEach( async (createTypeDto) => {
        await this.typeService.create(createTypeDto);
      });
      return {
        message:'Seed execute'
      }
    } catch(exception) {
      console.log({exception});
      throw new ServiceUnavailableException(`Seed execute before`);
    }
    
  }


}
