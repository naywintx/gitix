import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import AboutIcon from "@material-ui/icons/Info";
import SupportIcon from "@material-ui/icons/Help";
import DonateIcon from "@material-ui/icons/Stars";
const styles = {
  tinyIcon: {
    width: 12,
    height: 12
  }
};
export default () => (
  <Container>
    <hr />
    <Grid container>
      <Grid item xs={12} sm={4}>
        <Typography variant="body2" style={{ fontSize: "small" }}>
          <AboutIcon style={styles.tinyIcon} /> About
          <br />
          <a
            href="http://openintents.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenIntents
          </a>
          <br />
          <a
            href="https://github.com/friedger/gitix"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source&nbsp;Code
          </a>
          <br />
          <a href="/terms" target="_blank" rel="noopener noreferrer">
            Terms
          </a>
          <br />
          <br />
          Built with
          <br />
          <a
            href="https://blockstack.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blockstack
          </a>
          <br />© {new Date().getFullYear()}, OpenIntents
          <br />Version {process.env.REACT_APP_VERSION}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Typography variant="body2" style={{ fontSize: "small" }}>
          <SupportIcon style={styles.tinyIcon} /> Support
          <br />
          <a
            href="https://www.producthunt.com/posts/gitix"
            target="_blank"
            rel="noopener noreferrer"
          >
            ProductHunt
          </a>
          <br />
          <a
            href="https://app.dmail.online/compose?to=openintents.id&subject=Gitix"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dmail
          </a>
          <br />
          <a
            href="https://www.twitter.com/GitixOrg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <br />
          <a
            href="https://github.com/friedger/gitix/issues?q=is%3Aissue+is%3Aopen+label%3Abug"
            target="_blank"
            rel="noopener noreferrer"
          >
            Known&nbsp;Issues
          </a>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Typography variant="body2" style={{ fontSize: "small" }}>
          <DonateIcon style={styles.tinyIcon} /> Love OI apps?
          <br />
          <a
            href="https://opencollective.com/openintents/donate"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open&nbsp;Collective&nbsp;OpenIntents
          </a>
          <br />
          <a
            href="https://bitpatron.co/friedger.id"
            target="_blank"
            rel="noopener noreferrer"
          >
            BitPatron
          </a>
        </Typography>
      </Grid>
    </Grid>
  </Container>
);
