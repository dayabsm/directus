import { UsersHandler, ItemsHandler } from '../../src/handlers';
import axios, { AxiosInstance } from 'axios';
import sinon, { SinonSandbox } from 'sinon';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

describe('UsersHandler', () => {
	let sandbox: SinonSandbox;
	let axiosInstance: AxiosInstance;
	let handler: UsersHandler;

	beforeEach(() => {
		sandbox = sinon.createSandbox();
		axiosInstance = axios.create();
		handler = new UsersHandler(axiosInstance);
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('Extends ItemsHandler', () => {
		expect(handler).to.be.instanceOf(ItemsHandler);
	});

	describe('invite', () => {
		it('Calls the /users/invite endpoint', async () => {
			const stub = sandbox.stub(handler.axios, 'post').resolves(Promise.resolve());

			await handler.invite('admin@example.com', 'abc');
			expect(stub).to.have.been.calledWith('/users/invite', {
				email: 'admin@example.com',
				role: 'abc',
			});

			await handler.invite(['admin@example.com', 'user@example.com'], 'abc');
			expect(stub).to.have.been.calledWith('/users/invite', {
				email: ['admin@example.com', 'user@example.com'],
				role: 'abc',
			});
		});
	});

	describe('acceptInvite', () => {
		it('Calls the /users/invite/accept endpoint', async () => {
			const stub = sandbox.stub(handler.axios, 'post').resolves(Promise.resolve());

			await handler.acceptInvite('abc.def.ghi', 'p455w0rd');

			expect(stub).to.have.been.calledWith('/users/invite/accept', {
				token: 'abc.def.ghi',
				password: 'p455w0rd',
			});
		});
	});

	describe('tfa.enable', () => {
		it('Calls the /users/tfa/enable endpoint', async () => {
			const stub = sandbox.stub(handler.axios, 'post').resolves(Promise.resolve());

			await handler.tfa.enable('p455w0rd');

			expect(stub).to.have.been.calledWith('/users/tfa/enable', {
				password: 'p455w0rd',
			});
		});
	});

	describe('tfa.disable', () => {
		it('Calls the /users/tfa/disable endpoint', async () => {
			const stub = sandbox.stub(handler.axios, 'post').resolves(Promise.resolve());

			await handler.tfa.disable('351851');

			expect(stub).to.have.been.calledWith('/users/tfa/disable', {
				otp: '351851',
			});
		});
	});
});
