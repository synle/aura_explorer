//external
import _ from 'lodash';
import React from 'react';

//internal
import util from '~/src/frontend/library/util';


//definitions
const KeyValueXmlSyntax = React.createClass({
	render(){
		const {objects, tagName} = this.props;

		const domAttributes = _.chain( _.keys(objects) )
			.sort()
			.map(objKey => {
				const objVal = objects[objKey];
				return `${objKey}="${objVal}"`;
			})
			.value()
			.join(' ');

		const tagNameWithoutExtension = util.getTagNameFromControlName(tagName);
		const tagDetailString = `<${tagNameWithoutExtension} ${domAttributes} />`;

		return (
			<pre>{tagDetailString}</pre>
		);
	}
});

export default KeyValueXmlSyntax;