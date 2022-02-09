import { InstanceType, ModelType, prop } from 'typegoose';
import { BaseModel, schemaOptions } from '../../../shared/base.model';
import { AutoMap } from '@nartc/automapper';


export class Team extends BaseModel<Team> {
    @prop({ required: [true, 'name is required'] })
    @AutoMap()
    nameTeam: string;

    @prop()
    @AutoMap()
    lenguaje: string;

    @prop()
    @AutoMap()
    position: string;

    @prop()
    @AutoMap()
    country: string;

    @prop()
    @AutoMap()
    state: string;

    @prop()
    @AutoMap()
    city: string;

    @prop()
    @AutoMap()
    champions: int;

    @prop()
    @AutoMap()
    playoffs: int;

    @prop()
    @AutoMap()
    win: int;

    @prop()
    @AutoMap()
    allPlays: string;

    @prop()
    @AutoMap()
    Staff: Any;

    @prop()
    @AutoMap()
    templateTeam: Any;

    @prop()
    @AutoMap()
    champions: Array<any>;

    static get model(): ModelType<Workout> {
        return new Workout().getModelForClass(Workout, { schemaOptions });
    }

    static get modelName(): string {
        return this.model.modelName;
    }

    static createModel(params?: any): InstanceType<Workout> {
        return new this.model(params);
    }
}
