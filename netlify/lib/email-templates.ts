import { escapeHtml } from './sanitize'

const INK = '#0A0A0A'
const PAPER = '#F5F5F0'
const ACCENT = '#C9B99A'

export function renderEmailShell(
  heading: string,
  reference: string,
  rowsHtml: string,
  footnote?: string,
): string {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background-color:${INK};font-family:Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${INK};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:560px;background-color:#141414;border:1px solid rgba(245,245,240,0.14);border-radius:8px;overflow:hidden;">
            <tr>
              <td style="padding:32px 32px 8px 32px;">
                <p style="margin:0;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${ACCENT};">Gadgets &amp; Travels</p>
                <h1 style="margin:12px 0 0 0;font-size:24px;color:${PAPER};font-weight:600;">${escapeHtml(heading)}</h1>
                <p style="margin:8px 0 0 0;font-size:13px;color:#8f8e84;">Reference: <strong style="color:${ACCENT};">${escapeHtml(reference)}</strong></p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 32px 32px;">
                <table role="presentation" width="100%" style="border-collapse:collapse;">
                  ${rowsHtml}
                </table>
                ${footnote ? `<p style="margin:24px 0 0 0;font-size:12px;color:#8f8e84;line-height:1.6;">${footnote}</p>` : ''}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

export function emailRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 0;border-bottom:1px solid rgba(245,245,240,0.1);font-size:12px;color:#8f8e84;text-transform:uppercase;letter-spacing:1px;width:38%;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:8px 0;border-bottom:1px solid rgba(245,245,240,0.1);font-size:14px;color:${PAPER};vertical-align:top;">${escapeHtml(value)}</td>
  </tr>`
}
