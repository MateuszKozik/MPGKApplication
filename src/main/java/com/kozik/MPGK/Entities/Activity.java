import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "activities")
@Data
public class Activity{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "activity_id", nullable = false)
    private Long activityId;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "type", nullable = false, length = 100)
    private String type;

    @Column(name = "emsr", nullable = false, length = 25)
    private String emsr;

    
    @Column(name = "setting", nullable = false, length = 35)
    private String setting;

    @ManyToOne
    @JoinColumn(name = "groupId", nullable = false)
    private ActivityGroup activityGroup;

    public Activity(){}

    public Activity(String name,String type,String emsr,String setting)
    {
        this.name = name;
        this.type = type;
        this.emsr = emsr;
        this.setting = setting;
    }


}