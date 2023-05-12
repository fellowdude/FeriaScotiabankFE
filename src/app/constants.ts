import { environment } from 'src/environments/environment';

export class Constants {
  public static API_KEY =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI5NzgwYTI5MmE1OGUyM2RhZTI0Mjg0NjE0NTNlZjkxZmJiMTNiNjdmNzEyYmYxZWM3ZmM4MDc1YzI1MjBhMGQ3ZDVlYTM3ODA2MWM1ZGIzZDA3Nzc1NjZmYjA2ZDMzYzciLCJzeXN0ZW1fYXBpIjoic2NvdGlhYmFua19mZXJpYSIsImlhdCI6MTYwMDEwNzU1MH0.Cq6jlVl1l5HM-ImUMvC_kEBILetq0iHELDuXkyoH0pjWB7WOndF7LnasHcTBZWMw-8WR01QU03c-YIDv5cpw-w';

  public static GTAG = environment.GTAG; //'UA-203868702-1';
  public static URL_BACKEND = environment.URL_BACKEND;

  public static readonly FRONT_KEY = `-----BEGIN RSA PRIVATE KEY-----
    MIIBOgIBAAJBAIu+SitTqEqImZqzFrKkvp58PVbcSGDv/q9l4xkYe24kU5AACSZc
    TYRQrfPwL9Sr+VZNgZiZH7AIeV5GEgZG3QMCAwEAAQJABbxfyvt6EuUceO8U5WxB
    rrumwOP1zJTNPWHPOn54woKHpW1rEp5elL1SHzDqaPkY2VZirl998xbZ7bphs35p
    8QIhAMjcrLQWwu2R4ErmF7QW8gCqoYwWB898tZPxQLaJlMP1AiEAshqTbWuVdDUQ
    wcq/xx/LsH4QdDNfOX7Pd+2oVozc+hcCIDW2NQSPVZ7btGOy9cG1pQ8ikcJ5HauR
    SKkACXMGhV6FAiAEA49RBvyuSsfe5jfeP/wyNRUf2UyLGi2I0WVa1f/g7wIhAK9B
    e2JSos7G96yPpDeA5CcXwxYAYYjqWGwOwpLOqooI
      -----END RSA PRIVATE KEY-----`;

  public static readonly POINTS_DIVIDER = 30;
}
