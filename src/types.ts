import { FromSchema } from 'json-schema-to-ts'

import josaSchemaJson from '$/josa.config.model.json'

const josaSchema = josaSchemaJson.definitions.JosaElement as
/* eslint-disable multiline-comment-style */
/**
* @example
* [[[gocog
* require("./gen.cjs")(
*   (josaElementSchema) =>
*     JSON.stringify(josaElementSchema),
*   {
*     jsonFile: '../schemas/josa.config.model.json',
*     jsonPath: 'definitions.JosaElement'
*   }
* )
* gocog]]] */
/***/
/* eslint-enable multiline-comment-style */
{ 'type': 'object', 'additionalProperties': false, 'properties': { 'getterName': { 'type': 'string', 'description': 'Name of getter and appender function to use when generating code' }, 'whenTrue': { 'type': 'string', 'description': 'Josa string to use when branching function returned true' }, 'whenFalse': { 'type': 'string', 'description': 'Josa string to use when branching function returned false' }, 'usesCustomBranching': { 'type': 'boolean', 'default': true, 'description': 'Whether if this josa completing case uses custom branching function, should define one manually in the code if set true' }, 'example': { 'type': 'object', 'description': 'Usage example for generating JSDoc', 'properties': { 'description': { 'type': 'string', 'description': 'Explanation of what it does' }, 'code': { 'type': 'string', 'description': 'Simple usage example code' } }, 'required': ['description', 'code'], 'additionalProperties': false } }, 'required': ['getterName', 'whenFalse', 'whenTrue'], 'title': 'JosaElement' }
/* [[[end]]] */
export type JosaData = FromSchema<typeof josaSchema>
