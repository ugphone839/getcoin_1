
export default async function handler(req, res) {
  const { sid, m } = req.query;

  const urls = {
    yeumoney: "https://yeumoney.com/QL_api.php?token=eb9e0413809a65da8f01f52986a293d6033ca8abba768111f9bfa68d72bbe1a3&url=",
    click1s: "https://click1s.com/st?api=3a1e08b4cacf6d3d841c47ba741e55df98c625fe&url=",
    seotrieuview: "https://seotrieuview.com/st?api=c3d9dec0e676f3d21777df4e93cb7a5a5b95b5d1&url="
  };

  const callback = `http://87.106.24.9:1961/callback`;
  const finalUrl = urls[m] + encodeURIComponent(`https://getcoin-plum.vercel.app/api/callback-proxy?sid=${sid}&m=${m}`);

  res.redirect(finalUrl);
}
