declare module 'payu-websdk' {
    interface PayuCredentials {
      key: string; // Your merchant key
      salt: string; // Your merchant salt
    }
  
    type Environment = 'TEST' | 'PROD';
  
    interface PayuConfig {
      [key: string]: any; // Extend with additional configuration options if needed
    }
  
    class Payu {
      constructor(credes: PayuCredentials, env?: Environment, config?: PayuConfig);
  
      // Hasher methods
      hasher: {
        generatePaymentHash(params: Record<string, any>): string;
        validateResponseHash(params: Record<string, any>): boolean;
        generateResponseHash(params: Record<string, any>): string;
      };
  
      // Payment-related methods
      paymentInitiate(params: Record<string, any>): Promise<any>;
      verifyPayment(txnid: string): Promise<any>;
      getTransactionDetails(startDate: string, endDate: string): Promise<any>;
      validateVPA(vpa: string): Promise<any>;
      cancelRefundTransaction(
        payuid: string,
        tokenID: string,
        amount: number,
        callbackURL?: string
      ): Promise<any>;
      checkActionStatus(requestID: string): Promise<any>;
      getNetbankingStatus(bankcode?: string): Promise<any>;
      getIssuingBankStatus(bin: string): Promise<any>;
      checkIsDomestic(bin: string): Promise<boolean>;
      eligibleBinsForEMI(bin: string): Promise<any>;
      getEmiAmountAccordingToInterest(amount: number): Promise<any>;
      createInvoice(params: Record<string, any>): Promise<any>;
      expireInvoice(txnID: string): Promise<any>;
      getSettlementDetails(var1: string): Promise<any>;
      getCheckoutDetails(var1: Record<string, any>): Promise<any>;
    }
  
    export default Payu;
  }
  