package com.cp.toysgiveaway.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity
public class Toys {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long toyId;
	private String toyName;
	private String toyDescription;
	private Long toyPrice;
	private int quantity;
	private Boolean availability;
	@Lob
	private String toyImage;
	private String imageName;
	private Long sellerId;
	public Long getToyId() {
		return toyId;
	}
	public void setToyId(Long toyId) {
		this.toyId = toyId;
	}
	public String getToyName() {
		return toyName;
	}
	public void setToyName(String toyName) {
		this.toyName = toyName;
	}
	public String getToyDescription() {
		return toyDescription;
	}
	public void setToyDescription(String toyDescription) {
		this.toyDescription = toyDescription;
	}
	public Long getToyPrice() {
		return toyPrice;
	}
	public void setToyPrice(Long toyPrice) {
		this.toyPrice = toyPrice;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public Boolean getAvailability() {
		return availability;
	}
	public void setAvailability(Boolean availability) {
		this.availability = availability;
	}
	public String getToyImage() {
		return toyImage;
	}
	public void setToyImage(String toyImage) {
		this.toyImage = toyImage;
	}
	public String getImageName() {
		return imageName;
	}
	public void setImageName(String imageName) {
		this.imageName = imageName;
	}
	public Long getSellerId() {
		return sellerId;
	}
	public void setSellerId(Long sellerId) {
		this.sellerId = sellerId;
	}
}
