import { InstanceType, ModelType, prop } from 'typegoose';
import { BaseModel, schemaOptions } from '../../../shared/base.model';
import { AutoMap } from '@nartc/automapper';


export class Player extends BaseModel<Player> {
    @prop({ required: [true, 'name is required'] })
    @AutoMap()
    name: string;

    @prop()
    @AutoMap()
    position: string;

    @prop()
    @AutoMap()
    age: string;

    @prop()
    @AutoMap()
    weight: string;

    @prop()
    @AutoMap()
    height: string;

    @prop()
    @AutoMap()
    team: string;

    @prop()
    @AutoMap()
    lenguaje: string;

    @prop()
    @AutoMap()
    image: string;

    @prop()
    @AutoMap()
    createdBy: string;

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
