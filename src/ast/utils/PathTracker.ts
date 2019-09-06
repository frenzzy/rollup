import { Entity } from '../Entity';
import { ObjectPath, UnknownKey } from '../values';

const EntitiesKey = Symbol('Entities');
interface EntityPaths {
	[EntitiesKey]: Set<Entity>;
	[UnknownKey]?: EntityPaths;
	[pathSegment: string]: EntityPaths;
}

export class PathTracker {
	entityPaths: EntityPaths = Object.create(null, { [EntitiesKey]: { value: new Set<Entity>() } });

	getEntities(path: ObjectPath) {
		let currentPaths = this.entityPaths;
		for (const pathSegment of path) {
			currentPaths = currentPaths[pathSegment] =
				currentPaths[pathSegment] ||
				Object.create(null, { [EntitiesKey]: { value: new Set<Entity>() } });
		}
		return currentPaths[EntitiesKey];
	}
}

export const EMPTY_IMMUTABLE_TRACKER = new PathTracker();
