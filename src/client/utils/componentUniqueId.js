const components = {}

export default class ComponentUniqueId {

	// instance
	constructor(component) {
		this.componentName = component.constructor.name

		if (!components[this.componentName]) {
			components[this.componentName] = 1;
		} else {
			components[this.componentName]++;
		}

		this.instanceNumber = components[this.componentName];
	}

	getUniqueId(...params) {
		let toReturn = this.toString()
		
		if (params.length > 0) {
			toReturn += '_' + params.join('_');
		}

		return toReturn;
	}

	toString() {
		return this.componentName + '_' + this.instanceNumber
	}

	// getFormUniqueId() {
	// 	return this.componentName + '_' + this.instanceNumber
	// }

	// getFieldUniqueId(fieldName) {
	// 	return this.getFormUniqueId() + '_' + fieldName
	// }

}