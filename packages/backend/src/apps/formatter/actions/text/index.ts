import defineAction from '../../../../helpers/define-action';
import capitalize from './transformers/capitalize';
import htmlToMarkdown from './transformers/html-to-markdown';
import markdownToHtml from './transformers/markdown-to-html';
import useDefaultValue from './transformers/use-default-value';
import extractEmailAddress from './transformers/extract-email-address';
import extractNumber from './transformers/extract-number';
import lowercase from './transformers/lowercase';
import pluralize from './transformers/pluralize';
import trimWhitespace from './transformers/trim-whitespace';
import replace from './transformers/replace';

const transformers = {
  capitalize,
  htmlToMarkdown,
  markdownToHtml,
  useDefaultValue,
  extractEmailAddress,
  extractNumber,
  lowercase,
  pluralize,
  trimWhitespace,
  replace,
};

export default defineAction({
  name: 'Text',
  key: 'text',
  description:
    'Transform text data to capitalize, extract emails, apply default value, and much more.',
  arguments: [
    {
      label: 'Transform',
      key: 'transform',
      type: 'dropdown' as const,
      required: true,
      description: 'Pick a channel to send the message to.',
      variables: true,
      options: [
        { label: 'Capitalize', value: 'capitalize' },
        { label: 'Convert HTML to Markdown', value: 'htmlToMarkdown' },
        { label: 'Convert Markdown to HTML', value: 'markdownToHtml' },
        { label: 'Use Default Value', value: 'useDefaultValue' },
        { label: 'Extract Email Address', value: 'extractEmailAddress' },
        { label: 'Extract Number', value: 'extractNumber' },
        { label: 'Lowercase', value: 'lowercase' },
        { label: 'Pluralize', value: 'pluralize' },
        { label: 'Trim Whitespace', value: 'trimWhitespace' },
        { label: 'Replace', value: 'replace' },
      ],
      additionalFields: {
        type: 'query',
        name: 'getDynamicFields',
        arguments: [
          {
            name: 'key',
            value: 'listTransformOptions',
          },
          {
            name: 'parameters.transform',
            value: '{parameters.transform}',
          },
        ],
      },
    },
  ],

  async run($) {
    const transformerName = $.step.parameters
      .transform as keyof typeof transformers;
    const output = transformers[transformerName]($);

    $.setActionItem({
      raw: {
        output,
      },
    });
  },
});
