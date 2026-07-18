export interface NegotiationState {
  chatHistory: { role: string; content: string }[];
  currentOffer: number;
  floorPrice: number;
  attempts: number;
  isAgreed: boolean;
}
export class NegotiationGraphEngine {
  public static processStep(state: NegotiationState, buyerMessage: string): NegotiationState {
    const updatedState = { ...state, attempts: state.attempts + 1 };
    updatedState.chatHistory.push({ role: 'user', content: buyerMessage });
    const proposedAmount = parseFloat(buyerMessage.replace(/[^0-9.]/g, ''));
    if (!isNaN(proposedAmount) && proposedAmount >= state.floorPrice) {
      updatedState.isAgreed = true;
      updatedState.currentOffer = proposedAmount;
      updatedState.chatHistory.push({ role: 'assistant', content: 'Offre acceptée.' });
    } else {
      const counterOffer = Math.max(state.floorPrice * 1.05, state.currentOffer * 0.95);
      updatedState.currentOffer = counterOffer;
      updatedState.chatHistory.push({
        role: 'assistant',
        content: `Contre-proposition : ${counterOffer}`,
      });
    }
    return updatedState;
  }
}
