import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "userID", nullable = false)
    private Long userID;

    @Column(name = "username", nullable = true, length = 35)
    private String username;

    @Column(name = "password", nullable = true, length = 60)
    private String password;

    @Column(name = "enabled", nullable = false)
    private Boolean enabled = true;

    @ManyToMany(mappedBy = "user")
    private Set<Roles> roles = new HashSet<Roles>();

    @OneToOne(mappedBy = "user")
    private Persons persons;

    public User(){}

    public User(String username,String password,Boolean enabled)
    {
        this.username = username;
        this.password = password;
        this.enabled = enabled;
    }




}