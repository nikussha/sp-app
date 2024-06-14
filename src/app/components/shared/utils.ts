import { DomSanitizer } from '@angular/platform-browser';

export function highlightKeyWords(
  query: string,
  dataArray: any[],
  sanitizer: DomSanitizer
): any[] {
  const keywords = query
    .split(' ')
    .map((keyword) => keyword.trim().toLowerCase());

  return dataArray.map((item) => {
    let highlightedTitle = item.title;
    let highlightedSummary = item.summary;

    keywords.forEach((keyword) => {
      const regex = new RegExp(`(${keyword})`, 'gi');

      if (regex.test(highlightedTitle)) {
        highlightedTitle = highlightedTitle.replace(
          regex,
          '<span style="background-color: yellow;">$1</span>'
        );
      } else {
        highlightedSummary = highlightedSummary.replace(
          regex,
          '<span style="background-color: yellow;">$1</span>'
        );
      }

      highlightedSummary = highlightedSummary + '...';
    });

    return {
      ...item,
      title: sanitizer.bypassSecurityTrustHtml(highlightedTitle),
      summary: sanitizer.bypassSecurityTrustHtml(highlightedSummary),
    };
  });
}
