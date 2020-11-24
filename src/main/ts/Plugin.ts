import uploadVideo from "./core/upload";

declare const tinymce: any;

const dialog = (editor) => {
  return {
    title: "上传视频",
    body: {
      type: "panel",
      items: [
        {
          name: "source",
          type: "urlinput",
          filetype: "media",
          label: "Source",
        },
        {
          type: "sizeinput",
          name: "dimensions",
          label: "Constrain proportions",
          constrain: true,
        },
      ],
    },
    buttons: [
      {
        type: "cancel",
        name: "cancel",
        text: "Cancel",
      },
      {
        type: "submit",
        name: "save",
        text: "Save",
        primary: true,
      },
    ],
    onSubmit(api) {
      const data = api.getData()
      console.log('data',data);

      editor.execCommand(
        "mceInsertContent",
        false,
        `<video controls name="media" width="${data.dimensions.width}" height="${data.dimensions.height}"><source src=${data.source.value} type="video/mp4"></video>`
      );
      api.close();
    },
    onChange(api, detail) {
      if (detail.name === "source") {
        uploadVideo(api);
      }
    },
  };
};

const setup = (editor) => {
  editor.ui.registry.addButton("video-upload", {
    icon: "embed",
    onAction: () => {
      // tslint:disable-next-line:no-console
      const dialogConfig = dialog(editor);
      editor.windowManager.open(dialogConfig);
    },
  });
};

export default () => {
  tinymce.PluginManager.add('video-upload', setup);
};
