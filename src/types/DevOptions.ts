/**
 * `vue-up`'s development options.
 *
 * @export
 * @interface DevOptions
 */
export default interface DevOptions {
	/**
	 * Path to entry file for development
	 *
	 * @type {string}
	 * @memberof DevOptions
	 */
	entry: string;
	/**
	 * Define global constants to apply at compile time
	 *
	 * @type {Record<string, any>}
	 * @memberof DevOptions
	 */
	define?: Record<string, any>;
	/**
	 * Port of development server
	 *
	 * @type {number}
	 * @default 8080
	 * @memberof DevOptions
	 */
	port?: number;
	/**
	 * Open in browser when server run
	 *
	 * @type {boolean}
	 * @default true
	 * @memberof DevOptions
	 */
	open?: boolean;
	/**
	 * Title of development page
	 *
	 * @type {string}
	 * @default 'Vue Library'
	 * @memberof DevOptions
	 */
	htmlTitle?: string;
}
