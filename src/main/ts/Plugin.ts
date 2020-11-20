declare const tinymce: any;

const setup = (editor, url) => {
  editor.ui.registry.addButton('video-upload', {
    text: 'video-upload button',
    onAction: () => {
      // tslint:disable-next-line:no-console
      editor.setContent('<p>content added from video-upload</p>');
    }
  });
};

export default () => {
  tinymce.PluginManager.add('video-upload', setup);
};