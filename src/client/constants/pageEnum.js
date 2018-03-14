import {Enum} from 'enumify'

export default class PageEnum extends Enum {}

PageEnum.initEnum([
	'BasePage',	
	'HomePage',	
	'UsersPage',
	'UserCreatePage',
	'UserEditPage',
	'NotFoundPage'
])
