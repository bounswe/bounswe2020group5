import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";

function Terms() {
  const classes = useStyles();
  let [checked, setChecked] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleChecked = (event) => {
    setChecked(event.target.checked);
    if (!event.target.checked) {
      console.log("0");
      localStorage.setItem("terms", "0");
    } else {
      console.log("1");
      localStorage.setItem("terms", "1");
    }
  };
  const handleopen = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <div style={{ marginLeft: 40, marginRight: 40, marginTop: 10 }}>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={() => setOpen(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.pape}>
              <h2 id="transition-modal-title">USER LISENCE AGREEMENT</h2>
              <p id="transition-modal-description">
                <span>
                  {" "}
                  By using BUPAZAR, you agree to these conditions. Please read
                  them carefully.
                  <br></br>
                  <br></br>
                  <span style={{ fontWeight: "bold" }}> PRIVACY</span>
                  <br></br>
                  <br></br>
                  Please review our Privacy Notice, which also governs your use
                  of BUPAZAR, to understand our practices.
                  <br></br>
                  <br></br>
                  <span style={{ fontWeight: "bold" }}>
                    ELECTRONIC COMMUNICATIONS
                  </span>
                  <br></br>
                  <br></br>
                  When you use BUPAZAR, or send e-mails, text messages, and
                  other communications from your desktop or mobile device to us,
                  you may be communicating with us electronically. You consent
                  to receive communications from us electronically, such as
                  e-mails, texts, mobile push notices, or notices and messages
                  on this site and you can retain copies of these communications
                  for your records. You agree that all agreements, notices,
                  disclosures, and other communications that we provide to you
                  electronically satisfy any legal requirement that such
                  communications be in writing.
                  <br></br>
                  <br></br>
                  <span style={{ fontWeight: "bold" }}> PATENTS </span>
                  <br></br>
                  <br></br>
                  One or more patents owned by BUPAZAR and features and services
                  accessible via the BUPAZAR website.
                  <br></br>
                  <br></br>
                  <span style={{ fontWeight: "bold" }}>
                    LICENSE AND ACCESS{" "}
                  </span>
                  <br></br>
                  <br></br>
                  Subject to your compliance with these Conditions of Use and
                  any Service Terms, and your payment of any applicable fees,
                  BUPAZAR or its content providers grant you a limited,
                  non-exclusive, non-transferable, non-sublicensable license to
                  access and make personal and non-commercial use of the
                  BUPAZAR. This license does not include any resale or
                  commercial use of any BUPAZAR, or its contents; any collection
                  and use of any product listings, descriptions, or prices; any
                  derivative use of any BUPAZAR or its contents; any
                  downloading, copying, or other use of account information for
                  the benefit of any third party; or any use of data mining,
                  robots, or similar data gathering and extraction tools. All
                  rights not expressly granted to you in these Conditions of Use
                  or any Service Terms are reserved and retained by BUPAZAR or
                  its licensors, suppliers, publishers, rightsholders, or other
                  content providers. No part of BUPAZAR, may be reproduced,
                  duplicated, copied, sold, resold, visited, or otherwise
                  exploited for any commercial purpose without express written
                  consent of BUPAZAR. You may not frame or utilize framing
                  techniques to enclose any trademark, logo, or other
                  proprietary information (including images, text, page layout,
                  or form) of BUPAZAR without express written consent. You may
                  not use any meta tags or any other "hidden text" utilizing
                  BUPAZAR's name or trademarks without the express written
                  consent of BUPAZAR.
                  <br></br>
                  <br></br>
                  <span style={{ fontWeight: "bold" }}>
                    REVIEWS, COMMENTS, COMMUNICATIONS, AND OTHER CONTENT
                  </span>
                  <br></br>
                  <br></br>
                  You may post reviews, comments, photos, videos, and other
                  content; send e-cards and other communications; and submit
                  suggestions, ideas, comments, questions, or other information,
                  so long as the content is not illegal, obscene, threatening,
                  defamatory, invasive of privacy, infringing of intellectual
                  property rights (including publicity rights), or otherwise
                  injurious to third parties or objectionable, and does not
                  consist of or contain software viruses, political campaigning,
                  commercial solicitation, chain letters, mass mailings, or any
                  form of "spam" or unsolicited commercial electronic messages.
                  You may not use a false e-mail address, impersonate any person
                  or entity, or otherwise mislead as to the origin of a card or
                  other content. BUPAZAR reserves the right (but not the
                  obligation) to remove or edit such content, but does not
                  regularly review posted content.
                  <br></br>
                  If you do post content or submit material, and unless we
                  indicate otherwise, you grant BUPAZAR a nonexclusive,
                  royalty-free, perpetual, irrevocable, and fully sublicensable
                  right to use, reproduce, modify, adapt, publish, perform,
                  translate, create derivative works from, distribute, and
                  display such content throughout the world in any media. You
                  grant BUPAZAR and sublicensees the right to use the name that
                  you submit in connection with such content, if they choose.
                  You represent and warrant that you own or otherwise control
                  all of the rights to the content that you post; that the
                  content is accurate; that use of the content you supply does
                  not violate this policy and will not cause injury to any
                  person or entity; and that you will indemnify BUPAZAR for all
                  claims resulting from content you supply. BUPAZAR has the
                  right but not the obligation to monitor and edit or remove any
                  activity or content. BUPAZAR takes no responsibility and
                  assumes no liability for any content posted by you or any
                  third party.
                  <br></br>
                  <br></br>
                  <span style={{ fontWeight: "bold" }}>
                    INTELLECTUAL PROPERTY COMPLAINTS{" "}
                  </span>
                  <br></br>
                  <br></br>
                  BUPAZAR respects the intellectual property of others. If you
                  believe that your intellectual property rights are being
                  infringed, please follow our Notice and Procedure for Making
                  Claims of Copyright Infringement.
                  <br></br>
                  <br></br>
                  <span style={{ fontWeight: "bold" }}>RISK OF LOSS </span>
                  <br></br>
                  <br></br>
                  All purchases of physical items from BUPAZAR are made pursuant
                  to a shipment contract. This means that the risk of loss and
                  title for such items pass to you upon our delivery to the
                  carrier.
                  <br></br>
                  <br></br>
                  <span style={{ fontWeight: "bold" }}>
                    RETURNS, REFUNDS AND TITLE
                  </span>
                  <br></br>
                  <br></br>
                  BUPAZAR does not take title to returned items until the item
                  arrives at our fulfillment center. At our discretion, a refund
                  may be issued without requiring a return. In this situation,
                  BUPAZAR does not take title to the refunded item. For more
                  information about our returns and refunds, please see our
                  Returns Center .<br></br>
                  <br></br>
                  <span style={{ fontWeight: "bold" }}>
                    PRODUCT DESCRIPTIONS
                  </span>
                  <br></br>
                  <br></br>
                  BUPAZAR attempts to be as accurate as possible. However,
                  BUPAZAR does not warrant that product descriptions or other
                  content of BUPAZAR is accurate, complete, reliable, current,
                  or error-free. If a product offered by BUPAZAR itself is not
                  as described, your sole remedy is to return it in unused
                  condition.
                  <br></br>
                  <br></br>
                  <span style={{ fontWeight: "bold" }}>PRICING</span>
                  <br></br>
                  <br></br>
                  "List Price" means the suggested retail price of a product as
                  provided by a manufacturer, supplier, or seller. We regularly
                  check List Prices against prices recently found on BUPAZAR and
                  other retailers. Certain products may have a "Was Price"
                  displayed, which is determined using recent price history of
                  the product on BUPAZAR. <br></br>
                  With respect to items sold by BUPAZAR, we cannot confirm the
                  price of an item until you order. Despite our best efforts, a
                  small number of the items in our catalog may be mispriced. If
                  the correct price of an item sold by BUPAZAR is higher than
                  our stated price, we will, at our discretion, either contact
                  you for instructions before shipping or cancel your order and
                  notify you of such cancellation. Other merchants may follow
                  different policies in the event of a mispriced item. <br></br>
                  We generally do not charge your credit card until after your
                  order has entered the shipping process or, for digital
                  products, until we make the digital product available to you.{" "}
                  <br></br>
                  <br></br>
                  <br></br>
                  <span style={{ fontWeight: "bold" }}>APP PERMISSIONS</span>
                  <br></br>
                  <br></br>
                  When you use apps created by BUPAZAR, such as the BUPAZAR App
                  , you may grant certain permissions to us for your device.
                  Most mobile devices provide you with information about these
                  permissions. To learn more about these permissions, click here
                  .<br></br>
                  <br></br>
                  <span style={{ fontWeight: "bold" }}>OTHER BUSINESSES</span>
                  <br></br>
                  <br></br>
                  Parties other than BUPAZAR operate stores, provide services or
                  software, or sell product lines through the BUPAZAR. In
                  addition, we provide links to the sites of affiliated
                  companies and certain other businesses. If you purchase any of
                  the products or services offered by these businesses or
                  individuals, you are purchasing directly from those third
                  parties, not from BUPAZAR. We are not responsible for
                  examining or evaluating, and we do not warrant, the offerings
                  of any of these businesses or individuals (including the
                  content of their Web sites). BUPAZAR does not assume any
                  responsibility or liability for the actions, product, and
                  content of all these and any other third parties. You should
                  carefully review their privacy statements and other conditions
                  of use.
                  <br></br>
                  <br></br>
                  <span style={{ fontWeight: "bold" }}>
                    DISCLAIMER OF WARRANTIES AND LIMITATION OF LIABILITY
                  </span>
                  <br></br>
                  <br></br>
                  ALL INFORMATION, CONTENT, MATERIALS, PRODUCTS (INCLUDING
                  SOFTWARE) AND OTHER SERVICES INCLUDED ON OR OTHERWISE MADE
                  AVAILABLE TO YOU THROUGH THE BUPAZAR SERVICES ARE PROVIDED BY
                  BUPAZAR ON AN "AS IS" AND "AS AVAILABLE" BASIS, UNLESS
                  OTHERWISE SPECIFIED IN WRITING. BUPAZAR MAKES NO
                  REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED,
                  AS TO THE OPERATION OF THE BUPAZAR SERVICES, OR THE
                  INFORMATION, CONTENT, MATERIALS, PRODUCTS (INCLUDING SOFTWARE)
                  OR OTHER SERVICES INCLUDED ON OR OTHERWISE MADE AVAILABLE TO
                  YOU THROUGH THE BUPAZAR SERVICES, UNLESS OTHERWISE SPECIFIED
                  IN WRITING. YOU EXPRESSLY AGREE THAT YOUR USE OF THE BUPAZAR
                  SERVICES IS AT YOUR SOLE RISK. <br></br>
                  TO THE FULL EXTENT PERMISSIBLE BY LAW, BUPAZAR DISCLAIMS ALL
                  WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,
                  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
                  PARTICULAR PURPOSE. BUPAZAR DOES NOT WARRANT THAT THE BUPAZAR
                  SERVICES, INFORMATION, CONTENT, MATERIALS, PRODUCTS (INCLUDING
                  SOFTWARE) OR OTHER SERVICES INCLUDED ON OR OTHERWISE MADE
                  AVAILABLE TO YOU THROUGH THE BUPAZAR SERVICES, BUPAZAR'S
                  SERVERS OR ELECTRONIC COMMUNICATIONS SENT FROM BUPAZAR ARE
                  FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. TO THE FULL
                  EXTENT PERMISSIBLE BY LAW, BUPAZAR WILL NOT BE LIABLE FOR ANY
                  DAMAGES OF ANY KIND ARISING FROM THE USE OF ANY BUPAZAR
                  SERVICE, OR FROM ANY INFORMATION, CONTENT, MATERIALS, PRODUCTS
                  (INCLUDING SOFTWARE) OR OTHER SERVICES INCLUDED ON OR
                  OTHERWISE MADE AVAILABLE TO YOU THROUGH ANY BUPAZAR SERVICE,
                  INCLUDING, BUT NOT LIMITED TO DIRECT, INDIRECT, INCIDENTAL,
                  PUNITIVE, AND CONSEQUENTIAL DAMAGES, UNLESS OTHERWISE
                  SPECIFIED IN WRITING. <br></br>
                  There is no judge or jury in arbitration, and court review of
                  an arbitration award is limited. However, an arbitrator can
                  award on an individual basis the same damages and relief as a
                  court (including injunctive and declaratory relief or
                  statutory damages), and must follow the terms of these
                  Conditions of Use as a court would. <br></br>
                  To begin an arbitration proceeding, you must send a letter
                  requesting arbitration and describing your claim to our
                  registered agent Corporation Service Company, 300 Deschutes
                  Way SW, Suite 208 MC-CSC1, Tumwater, WA 98501. The arbitration
                  will be conducted by the American Arbitration Association
                  (AAA) under its rules, including the AAA's Supplementary
                  Procedures for Consumer-Related Disputes. The AAA's rules are
                  available at www.adr.org or by calling 1-800-778-7879. Payment
                  of all filing, administration and arbitrator fees will be
                  governed by the AAA's rules. We will reimburse those fees for
                  claims totaling less than $10,000 unless the arbitrator
                  determines the claims are frivolous. Likewise, BUPAZAR will
                  not seek attorneys' fees and costs in arbitration unless the
                  arbitrator determines the claims are frivolous. You may choose
                  to have the arbitration conducted by telephone, based on
                  written submissions, or in person in the county where you live
                  or at another mutually agreed location. <br></br>
                  We each agree that any dispute resolution proceedings will be
                  conducted only on an individual basis and not in a class,
                  consolidated or representative action. If for any reason a
                  claim proceeds in court rather than in arbitration we each
                  waive any right to a jury trial. We also both agree that you
                  or we may bring suit in court to enjoin infringement or other
                  misuse of intellectual property rights.
                  <br></br>
                  <br></br>
                  <span style={{ fontWeight: "bold" }}>APPLICABLE LAW</span>
                  <br></br>
                  <br></br>
                  By using BUPAZAR, you agree that the Federal Arbitration Act,
                  applicable federal law, and the laws of the state of
                  Washington, without regard to principles of conflict of laws,
                  will govern these Conditions of Use and any dispute of any
                  sort that might arise between you and BUPAZAR.
                  <br></br>
                  <br></br>
                  <span style={{ fontWeight: "bold" }}>
                    SITE POLICIES, MODIFICATION, AND SEVERABILITY
                  </span>
                  <br></br>
                  <br></br>
                  Please review our other policies, such as our pricing policy,
                  posted on this site. These policies also govern your use of
                  BUPAZAR Services. We reserve the right to make changes to our
                  site, policies, Service Terms, and these Conditions of Use at
                  any time. If any of these conditions shall be deemed invalid,
                  void, or for any reason unenforceable, that condition shall be
                  deemed severable and shall not affect the validity and
                  enforceability of any remaining condition.
                </span>
              </p>
            </div>
          </Fade>
        </Modal>
        <FormControlLabel
          control={
            <Checkbox
              onChange={handleChecked}
              color="primary"
              checked={checked}
            />
          }
          label={
            <div>
              <span>I accept the </span>
              <Link onClick={handleopen}>Terms and Conditions.</Link>
            </div>
          }
        />
      </div>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  modal: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 100,
    marginRight: 100,
    overflow: "scroll",
    overflowX: "hidden",
  },
  pape: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default Terms;
