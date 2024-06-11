import React from "react";

type Props = {};

const TipsDialog = (props: Props) => {
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-xl">Safety Tips & Tricks</h3>
        <p className="text-lg">Important numbers</p>
        <ul className="list-disc pl-6">
          <li>150 - Fire Service</li>
          <li>155 - Ambulance</li>
          <li>156 - Local Police</li>
          <li>158 - Police</li>
        </ul>

        <p className="text-lg pt-3">General Safety Tips</p>
        <ul className="list-disc pl-6">
          <li>Stay aware of your surroundings</li>
          <li>Avoid walking alone at night</li>
          <li>Keep your phone charged</li>
          <li>Have a personal safety app installed</li>
        </ul>

        <p className="text-lg pt-3">City Safety Tips</p>
        <ul className="list-disc pl-6">
          <li>Let someone know your plans and expected return time</li>
          <li>Carry a whistle or personal alarm</li>
          <li>Stay in well-lit, populated areas</li>
          <li>Trust your instincts; if something feels wrong, leave</li>
          <li>Wear comfortable shoes for quick movement</li>
          <li>Keep your valuables hidden</li>
          <li>Learn basic self-defense techniques</li>
          <li>Be mindful of weather conditions and dress appropriately</li>
          <li>Use ATMs in well-lit, busy areas</li>
          <li>Keep your bag or purse close to your body</li>
          <li>Avoid using headphones in unfamiliar areas</li>
          <li>Know the locations of nearby safe places like cafes or shops</li>
          <li>Be cautious when accepting help from strangers</li>
        </ul>

        <p className="text-lg pt-3">Travel Safety Tips</p>
        <ul className="list-disc pl-6">
          <li>Keep copies of important documents</li>
          <li>Avoid sharing travel plans publicly</li>
          <li>Use secure transportation</li>
          <li>Stay in well-reviewed accommodations</li>
          <li>Carry a map and familiarize yourself with the area</li>
          <li>Keep emergency cash in a separate location</li>
          <li>Blend in with the local culture to avoid drawing attention</li>
          <li>Be cautious when using public Wi-Fi</li>
          <li>Only use registered taxis or ride-sharing services</li>
          <li>Avoid displaying expensive items publicly</li>
          <li>Know emergency exits and evacuation routes in buildings</li>
          <li>
            Stay alert in crowded places like markets and public transport
          </li>
        </ul>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default TipsDialog;
