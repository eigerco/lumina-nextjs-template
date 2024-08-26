/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (
		config,
		{ buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
	) => {
		config.module.rules.push({
			rules: [
				{
					test: /\.wasm$/,
					//type: "webassembly/async",
					type: "asset/resource",
					generator: { filename: 'static/[name]_[hash:10][ext]' }
				}
			]
		});

		if (!dev && isServer) {
			config.output.webassemblyModuleFilename = "chunks/[id].wasm";
			config.plugins.push(new WasmChunksFixPlugin());
		}

		if (isServer) {
			config.experiments.asyncWebAssembly = true;
		}

		return config
	},
}

class WasmChunksFixPlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap("WasmChunksFixPlugin", (compilation) => {
      compilation.hooks.processAssets.tap(
        { name: "WasmChunksFixPlugin" },
        (assets) =>
          Object.entries(assets).forEach(([pathname, source]) => {
            if (!pathname.match(/\.wasm$/)) return;
            compilation.deleteAsset(pathname);

            const name = pathname.split("/")[1];
            const info = compilation.assetsInfo.get(pathname);
            compilation.emitAsset(name, source, info);
          })
      );
    });
  }
}

export default nextConfig;
