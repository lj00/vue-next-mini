import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'

export default [{
  // 入口文件
	input: 'packages/vue/src/index.ts',
	// 打包出口
	output: [
		// 导出iife模式的包
		{
			// 开启sourceMap
			sourcemap: true,
			// 导出文件地址
			file: './packages/vue/dist/vue.js',
			// 生成包的格式
			format: 'iife',
			// 变量名
			name: 'Vue'
		}
	],
	// 插件
	plugins: [
		// ts支持
		typescript({
			sourceMap: true
		}),
		// 模块导入的路径补全
		resolve(),
		// 转commonjs为ESM
		commonjs()
	]
}]