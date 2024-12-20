export interface IBuildPaths {
	base: string;
	buildOut: string;
	src: string;
	components: string;
	assets: string;
}

export type TBuildMode = 'production' | 'development';

export interface IBuildOptions {
	port: number;
	paths: IBuildPaths;
	mode: TBuildMode;
	isNeedOthers?: boolean;
}
