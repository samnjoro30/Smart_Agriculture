"use client"

interface Animal{
    id: number;
    name: string;
    type: "cow" | "goat" | "chicken";
}

interface Crop {
    id: number;
    name: string;
    irrigation: boolean;
    acreage: number;
}

interface FarmData {
    farmingType: "dairy" | "goats" | "chickens" | "Mixed";
    //packagePlan: "free" | "basic" | "pro";
    animals: Animal[];
    crops: Crop[];
  }


export default function Farm() {
    return(
        <div>
            <div>
                <div>
                    <h3>Farm Data Collection</h3>
                    <p>Set up your farm details step by step</p>
                    <div>
                        <label>Which kind of Farming are you</label>
                        <select>
                            <option>Dairy Farming</option>
                            <option>Goats</option>
                            <option>Crop Farming</option>
                            <option>Mixed Farming</option>
                        </select>
                    </div>

                </div>
            </div>
        </div>
    )
}