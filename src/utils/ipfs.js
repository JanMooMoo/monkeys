
import IPFS from 'ipfs-api';

const projectId = '2DU3pAmtteHQBfdWwdSP7Blc1mM';
const projectSecret = '8a01072c7d51ba9d2dd14afb6929a94a';
const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const ipfs = new IPFS({
	host: 'ipfs.infura.io',
	port: 5001,
	protocol: 'https',
	headers: {
        authorization: auth,
    },
});

export default ipfs;