export type transforms = {
  [key: string]: any;
  delimiter(): string;
  header(block: block): string;
  paragraph(block: block): string;
  list(block: block): string;
  nestedlist(block: block): string;
  image(block: block): string;
  warning(block: block): string;
  quote(block: block): string;
  code(block: block): string;
  raw(block: block): string;
  embed(block: block): string;
};

type ListItem = {
  content: string;
  items: Array<ListItem>;
};

const alignType = ["left", "right", "center", "justify"];

export type block = {
  type: string;
  data: {
    text?: string;
    level?: number;
    title?: string;
    message?: string;
    caption?: string;
    url?: string;
    file?: {
      url?: string;
    };
    stretched?: boolean;
    withBackground?: boolean;
    withBorder?: boolean;
    items?: Array<string> | Array<ListItem>;
    style?: string;
    code?: string;
    service?: "vimeo" | "youtube" | "instagram" | "twitter";
    source?: string;
    embed?: string;
    width?: number;
    height?: number;
    alignment?: "left" | "right" | "center" | "justify";
    align?: "left" | "right" | "center" | "justify";
    html?: string;
  };
};

const transforms: transforms = {
  delimiter: () => {
    return `<hr />`;
  },

  header: ({ data }) => {
    return `<h${data.level}>${data.text}</h${data.level}>`;
  },

  paragraph: ({ data }) => {
    const paragraphAlign = data.alignment || data.align;

    if (
      typeof paragraphAlign !== "undefined" &&
      alignType.includes(paragraphAlign)
    ) {
      return `<p style="text-align:${paragraphAlign};">${data.text}</p>`;
    } else {
      return `<p>${data.text}</p>`;
    }
  },

  list: ({ data }) => {
    const listStyle = data.style === "unordered" ? "ul" : "ol";

    const recursor = (items: any, listStyle: string) => {
      const list = items.map((item: any) => {
        if (!item.content && !item.items) return `<li>${item}</li>`;

        let list = "";
        if (item.items) list = recursor(item.items, listStyle);
        if (item.content) return `<li> ${item.content} </li>` + list;
      });

      return `<${listStyle}>${list.join("")}</${listStyle}>`;
    };

    return recursor(data.items, listStyle);
  },

  nestedlist: ({ data }) => {
    const listStyle = data.style === "unordered" ? "ul" : "ol";

    const recursor = (items: any, listStyle: string) => {
      const list = items.map((item: any) => {
        if (!item.content && !item.items) return `<li>${item}</li>`;

        let list = "";
        if (item.items) list = recursor(item.items, listStyle);
        if (item.content) return `<li> ${item.content} </li>` + list;
      });

      return `<${listStyle}>${list.join("")}</${listStyle}>`;
    };

    return recursor(data.items, listStyle);
  },

  image: ({ data }) => {
    let caption = data.caption ? data.caption : "Image";
    return `<img src="${
      data.file && data.file.url ? data.file.url : data.url
    }" alt="${caption}" />`;
  },

  warning: ({ data }) => {
    return `<div class="warning">
      <h4>${data.title}</h4>
      <p>${data.message}</p>
    </div>`;
  },

  quote: ({ data }) => {
    return `<figure><blockquote>${data.text}</blockquote>${
      data.caption ? `<figcaption>${data.caption}</figcaption>` : ``
    }</figure>`;
  },

  code: ({ data }) => {
    return `<pre><code>${data.code}</code></pre>`;
  },

  raw: ({ data }) => {
    return data.html ? data.html : "";
  },

  embed: ({ data }) => {
    switch (data.service) {
      case "vimeo":
        return `<div class="${data.service}-embed"><iframe src="${data.embed}" width="${data.width}" height="${data.height}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>`;
      case "youtube":
        return `<div class="${data.service}-embed"><iframe width="${
          data.width
        }" height="${data.height}" ${
          data.width && data.height
            ? `style="aspect-ratio: ${data.width / data.height};"`
            : ""
        } src="${
          data.embed
        }" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
      case "twitter":
        return `<div class="${data.service}-embed"><blockquote class="twitter-tweet" class="embed-twitter" width="${data.width}" height="${data.height}"><a href="${data.embed}"></a></blockquote></div>`;
      case "instagram":
        return `<div class="${data.service}-embed"><blockquote class="instagram-media" width="${data.width}" height="${data.height}"><a href="${data.embed}/captioned"></a></blockquote></div>`;
      default:
        throw new Error(
          "Only Youtube, Vimeo, Twitter, Instagram Embeds are supported right now."
        );
    }
  },
};

export default transforms;
