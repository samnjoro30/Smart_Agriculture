import MilkEntryForm from './dataInput';
import MilkSummary from './milkData';

export default function MilkProduction() {
  return (
    <div className="p-3 space-y-6">
      <MilkEntryForm />
      <MilkSummary />
    </div>
  );
}
