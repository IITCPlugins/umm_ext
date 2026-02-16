// we have 2 entry points/scripts here
module.exports = {
  entry: {
    iitc: "./src/Main.ts",
    editor: "./src_MissionEditor/Main.ts",
  },
  output: {
    filename: "[name].user.js",
  },

  // add MD
  module: {
    rules: [
      {
        test: /\.md$/,
        type: "asset/source",
      },
    ],
  },
};
