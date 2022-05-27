import BackButton from "./components/BackButton";
import { Face, Reverse } from "./components/Cards";
import { categories } from "../Data";

import { For } from "solid-js"; 

function Deck() {
    const keys = Object.keys(categories);
    
    function batchCategories() {
        const arr = [];
        for (const key in keys) {
            const ids = Object.keys(categories[keys[key]]);
            for (const id of ids) {
                const quantity = categories[keys[key]][id].quantity;
                
                for (let i = 0; i < quantity; i++) 
                    arr.push({key, id});
            }
        }

        const size = Math.ceil(arr.length / 8);
        const batches = [];
        for (let i = 0; i < size; i++) {
            batches.push([]);
        }
            
        let j = 0, batch = 0;
        for (const elem of arr) {
            batches[batch].push(elem);
            j++;
            if (j == 8) {
                batch++;
                j = 0;
            }
        }
        
        return batches;
    }

    const batches = batchCategories();

    function Faces(props) {
        return (
            <div class="row">
                <For each={props.batch}> 
                {(card)=>
                    <Face id={card.id} category={keys[card.key]}/>
                }
                </For> 
            </div>
        );
    }

    function Reverses(props) {
        return (
            <div class="row">
                <For each={props.batch}> 
                {(card)=>
                    <Reverse category={keys[card.key]}/>
                }
                </For> 
            </div>
        );
    }

	return (
		<div class="container py-4 center a4">
            <div class="row no-print">
                <div class="col-auto my-auto">
                    <BackButton href="/" />
                </div>
                <div class="col-auto ms-auto">
                    <h1 class="display-6">Deck Preview</h1>
                </div>
                <div class="col-auto ms-auto my-auto">
                    <button type="button" class="btn btn-outline-secondary" onClick={() => print()}>
                        <i class="bi bi-printer"></i>
                    </button>
                </div>
            </div>
            <div class="ms-4">
                <For each={batches}> 
                {(batch) => 
                    <>
                        <Faces batch={batch} />
                        <br />
                        {/*<Reverses batch={batch} />
                        <br />*/}
                    </>
                }
                </For>
            </div>
        </div>
	);
}

export default Deck;

/*
<div class="row">
                <Face />
                <Face />
                <Face />
                <Face />
                <Face />
                <Face />
                <Face />
                <Face />
                </div>
                <br />
                <div class="row">
                <Face />
                <Face />
                <Face />
                <Face />
                </div>
*/
